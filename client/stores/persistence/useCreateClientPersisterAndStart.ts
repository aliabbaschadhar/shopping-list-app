import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createClientPersister } from "./createClientPersister";

export const useCreateClientPersistersAndStart = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas>,
  initialContentJson?: string,// initialContentJson is initial state of the store in JSON format
  then?: () => void
) => (UiReact as UiReact.WithSchemas<Schemas>).useCreatePersister(
  store,
  // Create the persister
  (store) => createClientPersister(storeId, store as MergeableStore<Schemas>),
  [storeId],

  async (persister) => {
    let initialContent = undefined;
    try {
      initialContent = JSON.parse(initialContentJson ?? "{}");
    } catch (err) {
      console.error(err)
    }
    // Start the persister
    await persister.load(initialContent);
    await persister.startAutoSave();
    then?.();
  }
)