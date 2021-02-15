import { action, makeAutoObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import Activities from "../api/agent";

configure({enforceActions: 'always'})

class ActivityStore {
  activityRegistry = new Map();
  activities: IActivity[] = [];
  loadingInitial = false;
  selectedActivity: IActivity | undefined;
  editMode = false;
	submitting = false;
  target = '';

  constructor() {
    makeAutoObservable(this);
  }

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).slice().sort((a, b) =>Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
			const activities = await Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id,activity);
        });
        this.loadingInitial = false;
      })
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      })
      console.log(error);
    }
  };

  @action selectActivity =  (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

	@action createActivity = async (activity: IActivity) => {
		this.submitting = true;
		try{
			await Activities.create(activity);
      runInAction(() =>{
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      })
		} catch (error) {
      runInAction(() =>{
        this.submitting = false;
      })
			console.log(error);
		}
	}

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try{
      await Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting  = false;
      })
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      })
			console.log(error);
    }
  }

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement> ,id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try{
      await Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
    
  }


  @action openEditForm = (id: string) =>{
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  @action cancelSelectedActivity = () =>{
    this.selectedActivity = undefined;
  }

  @action cancelFormOpen = () =>{
    this.editMode = false;
  }

  @action openCreateForm = () => {
		this.editMode = true;
		this.selectedActivity = undefined;
	}
}

export default createContext(new ActivityStore());
