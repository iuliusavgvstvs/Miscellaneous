import { action, makeAutoObservable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore{
  rootStore: RootStore;

  token: string | null = window.localStorage.getItem('jwt');
  appLoaded = false;

  constructor(rootStore: RootStore){
    makeAutoObservable(this);
    this.rootStore = rootStore;
    reaction(
      () => this.token,
      token => {
        if(token) {
          window.localStorage.setItem('jwt', token);
        }
        else{
          window.localStorage.removeItem('jwt');
        }
      }
    )
  }

  @action setToken = (token: string | null) =>{
    this.token = token;
  }

  @action setAppLoaded = () => {
    this.appLoaded = true;
  }
}