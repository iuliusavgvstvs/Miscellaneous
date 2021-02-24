import { action, makeAutoObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import Activities from "../api/agent";
import {history} from '../..'
import { toast } from "react-toastify";

configure({enforceActions: 'always'})

class ActivityStore {
  activityRegistry = new Map();
  loadingInitial = false;
  activity: IActivity | null = null;
	submitting = false;
  target = '';

  constructor() {
    makeAutoObservable(this);
  }

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
  }

  groupActivitiesByDate(activities: IActivity[]){
    const sortedActivities = activities.sort((a, b) =>a.date!.getTime() - b.date!.getTime());
    return Object.entries(sortedActivities.reduce((activities, activity) => {
      const date = activity.date.toISOString().split('T')[0];
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as {[key: string]: IActivity[]}));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
			const activities = await Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date)
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

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if(activity){
      this.activity = activity;
      return activity;
    }
    else{
      this.loadingInitial = true;
      try{
        activity = await Activities.details(id);
        runInAction(() => {
          activity.date = new Date(activity.date)
          this.activity = activity;
          this.activityRegistry.set(activity.id,activity);
          this.loadingInitial = false;
        })
        return activity;
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
          console.log(error);
        })
      }
    }
  }

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  @action selectActivity =  (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

	@action createActivity = async (activity: IActivity) => {
		this.submitting = true;
		try{
			await Activities.create(activity);
      runInAction(() =>{
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`)
		} catch (error) {
      runInAction(() =>{
        this.submitting = false;
      })
			toast.error('Problem submitting data')
		}
	}

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try{
      await Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting  = false;
      })
      history.push(`/activities/${activity.id}`)
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

  @action cancelSelectedActivity = () =>{
    this.activity = null;
  }

}

export default createContext(new ActivityStore());
