import { StatefulPloc } from "@/core/common/presentation";
import {
  storeModalInitialState,
  type StoreModalState,
} from "@/core/store/presentation";

export class StoreModalPloc extends StatefulPloc<StoreModalState> {
  constructor() {
    super(storeModalInitialState);
  }

  closeModal() {
    this.changeState({ isOpen: false });
  }

  openModal() {
    this.changeState({ isOpen: true });
  }
}
