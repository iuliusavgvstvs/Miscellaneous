import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, GridColumn, Segment } from "semantic-ui-react";
import { ActivityFormValues } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { v4 as uuid } from "uuid";
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate'
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message: 'Descpription needs to be at least 5 characters'}),

  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')  
})

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    loadActivity,
    createActivity,
    editActivity,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
          <FinalForm 
            validate = {validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  component={SelectInput}
                  options={category}
                  placeholder="Category"
                  value={activity.category}
                  rows={3}
                />
                <Form.Group widths="equal" >
                  <Field
                    component={DateInput}
                    name="date"
                    placeholder="Date"
                    value={activity.date}
                    date={true}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    placeholder="Time"
                    value={activity.time}
                    time={true}
                  />
                </Form.Group>
                <Field
                  name="city"
                  component={TextInput}
                  placeholder="City"
                  value={activity.city}
                />
                <Field
                  name="venue"
                  component={TextInput}
                  placeholder="Venue"
                  value={activity.venue}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  onChange={handleFinalFormSubmit}
                  positive
                  type="submit"
                  content="Submit"
                  disabled={loading || invalid || pristine}
                />
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);
