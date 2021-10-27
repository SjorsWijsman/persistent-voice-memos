<script>
  export let blob;

  const recordedMediaURL = URL.createObjectURL(blob.blob);
</script>

<audio controls="controls" src={recordedMediaURL} type="audio/mp3" />
