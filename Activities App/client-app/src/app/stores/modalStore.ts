import { action, makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

export default class ModalStore{
  rootStore: RootStore;

  modal = {
    open: false,
    body: null
  }

  constructor(rootStore: RootStore){
    makeAutoObservable(this)
    this.rootStore = rootStore;
  }

  @action openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  }
  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  }
}