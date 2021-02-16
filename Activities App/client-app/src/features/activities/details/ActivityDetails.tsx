import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom";
import { Grid, GridColumn } from "semantic-ui-react"
import { LoadingComp } from "../../../app/layout/LoadingComp";
import ActivityStore from '../../../app/stores/activityStore'
import { ActivityDetailChat } from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import { ActivityDetailInfo } from "./ActivityDetailInfo";
import { ActivityDetailSidebar } from "./ActivityDetailSidebar";

interface DetailParams{
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
  const activityStore = useContext(ActivityStore)
  const {activity,  loadActivity, loadingInitial} = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id])

  if(loadingInitial || !activity) return(  <LoadingComp content = 'Loading activity...' /> )
 
  return (
    <Grid>
      <GridColumn width = {10}>
        <ActivityDetailHeader activity = {activity}/>
        <ActivityDetailInfo activity = {activity}/>
        <ActivityDetailChat/>
      </GridColumn>
      <GridColumn width = {6}>
        <ActivityDetailSidebar/>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDetails)
