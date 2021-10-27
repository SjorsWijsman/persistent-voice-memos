<script>
  import { recording, db, storeName } from "../store.js";
  import { createEventDispatcher } from "svelte";

  // Dispatch event on creation of new recording
  const dispatch = createEventDispatcher();

  // This array stores the recorded media data
  let chunks = [];

  // Create mediaRecorder
  function startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((mediaStream) => {
        $recording = true;

        // Create a new MediaRecorder instance that records the received mediaStream
        const mediaRecorder = new MediaRecorder(mediaStream);

        // Make the mediaStream global
        window.mediaStream = mediaStream;

        // Make the mediaRecorder global
        window.mediaRecorder = mediaRecorder;

        mediaRecorder.start();

        mediaRecorder.ondataavailable = (e) => {
          // Push the recorded media data to the chunks array
          chunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          // Create new blob from recorded chunks
          const blob = new Blob(chunks, {
            type: "audio/mpeg",
          });
          // Submit new blob to database
          await $db.add($storeName, { blob });
          newRecordingEvent();
          chunks = [];
        };
      });
  }

  // Stop recording
  function stopRecording() {
    window.mediaStream.getTracks().forEach((track) => {
      $recording = false;
      track.stop();
    });
  }

  function newRecordingEvent() {
    dispatch("new-recording");
  }
</script>

{#if $recording}
  <button on:click|preventDefault={stopRecording}> Stop recording </button>
  <p>You are now recording...</p>
{:else}
  <button on:click|preventDefault={startRecording}> Start recording </button>
{/if}
