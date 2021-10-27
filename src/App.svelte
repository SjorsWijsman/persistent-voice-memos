<script>
  import Database from "./components/Database.svelte";
  import Record from "./components/Record.svelte";
  import Player from "./components/Player.svelte";
  import { db, storeName } from "./store.js";

  let blobs = [];

  // Update items on db init
  db.subscribe((database) => {
    if (database) getBlobs();
  });

  // Get all items in store collecton
  async function getBlobs() {
    if ($db) {
      blobs = await $db.getAll($storeName);
    }
  }
</script>

<Database />
<main>
  <h1>Record Memo</h1>
  <Record on:new-recording={getBlobs} />

  <h1>Memos</h1>
  {#each blobs as blob}
    <Player {blob} />
  {/each}
</main>
