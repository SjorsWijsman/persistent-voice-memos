<script>
  import { openDB } from "idb";
  import { db, storeName } from "../store.js";

  const DBVersion = 2;

  async function initDB() {
    $db = await openDB("memoDB", DBVersion, {
      upgrade(database, oldVersion, newVersion, transaction) {
        if (!database.objectStoreNames.contains($storeName)) {
          const store = database.createObjectStore($storeName, {
            // The 'id' property of the object will be the key.
            keyPath: "id",
            // If it isn't explicitly set, create a value by auto incrementing.
            autoIncrement: true,
          });
          store.createIndex("id", "id");
        }
      },
    });
  }

  initDB();
</script>
