import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import {User} from '../api/agent'
import { RootStore } from "./rootStore";
import { history } from "../..";

export default class UserStore {

  rootStore: RootStore;
  constructor(rootStore: RootStore){
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try{
      const user = await User.login(values);
      runInAction(() => {
        this.user = user;
        this.rootStore.modalStore.closeModal();
        this.rootStore.commonStore.setToken(user.token);
        history.push('/activities');
      })
    }catch (error) {
      runInAction(() => {
        throw error;
      })
    }
  }

  @action register = async (values: IUserFormValues) => {
    try{
      const user = await User.register(values);
      runInAction(() => {
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.modalStore.closeModal();
        history.push('/activities');
      })
    }catch (error){
      runInAction(() => {
      throw error;
    })
    }
  }

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  }

  @action getUser = async () => {
    try{
      const user = await User.current();
      runInAction(() => {
        this.user = user
      })
    }catch (error) {
      runInAction(() =>{
        console.log(error);
      })
    }
  }


}