import * as React from "react";
import {
  InjectedFormikProps,
  withFormik,
  Field,
  FieldProps,
  Form /*, FormikState */,
  FieldArray
} from "formik";

// const CustomInputTextComponent: React.SFC<FieldProps<any>> = ({

const CustomInputTextComponent: React.SFC<FieldProps<Show>> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  //   <div>
  //     <input type="text" {...field} {...props} />
  //     {touched[field.name] &&
  //       errors[field.name] && <div className="error">{errors[field.name]}</div>}
  //   </div>

  <div className="form-group">
    <label htmlFor={field.name}>
      {field.name[0].toUpperCase() +
        field.name.substring(1, field.name.length).toLowerCase()}
    </label>
    <input className="form-control" {...field} {...props} />

    {touched[field.name] &&
      errors[field.name] && (
        <div className="alert alert-danger">{errors[field.name]}</div>
      )}
  </div>
);

const CustomInputDateComponent: React.SFC<FieldProps<Show>> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  //   <div>
  //     <input type="text" {...field} {...props} />
  //     {touched[field.name] &&
  //       errors[field.name] && <div className="error">{errors[field.name]}</div>}
  //   </div>

  <div className="form-group">
    <label htmlFor={field.name}>
      {field.name[0].toUpperCase() +
        field.name.substring(1, field.name.length).toLowerCase()}
    </label>
    <input
      type="date"
      className="form-control"
      {...field}
      {...props}
      value={
        field.value
          ? field.value.toISOString
            ? field.value.toISOString().substring(0, 10)
            : field.value
          : ""
      }
    />

    {touched[field.name] &&
      errors[field.name] && (
        <div className="alert alert-danger">{errors[field.name]}</div>
      )}
  </div>
);

interface LabelOptions {
  labeltext?: string;
}

const CustomInputCheckboxComponent: React.SFC<
  FieldProps<Show> & LabelOptions
> = ({ field, form: { touched, errors }, ...props }) => (
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="checkbox"
      {...field}
      {...props}
      checked={field.value}
    />
    <label className="form-check-label" htmlFor={field.name}>
      {props.labeltext
        ? props.labeltext
        : field.name[0].toUpperCase() +
          field.name.substring(1, field.name.length).toLowerCase()}
    </label>
  </div>

  //   <div className="form-group">
  //     <label htmlFor={field.name}>
  //       {field.name[0].toUpperCase() +
  //         field.name.substring(1, field.name.length).toLowerCase()}
  //     </label>
  //     <input type="checkbox" className="form-control" {...field} {...props} />

  //     {touched[field.name] &&
  //       errors[field.name] && (
  //         <div className="alert alert-danger">{errors[field.name]}</div>
  //       )}
  //   </div>
);

export interface Show {
  id?: string;
  eventIdBts?: string;
  addedDate?: Date;
  isSoldOut: boolean;
  isCancelled: boolean;

  onSaleDate?: Date;

  priceText?: string;

  date: Date;
  venue: string;

  artists: Artist[];

  notes?: string;

  detailsUri?: string;
}

export interface Artist {
  name: string;
  stageTime?: string;

  videoUrl?: string;
}

export type ShowPartial = Partial<Show>;

// Show & {handleSubmit: Function}

const ShowFormCore: React.SFC<
  InjectedFormikProps<ShowPartial, Show>
> = props => {
  const {
    values,
    // touched,
    // errors,
    // handleChange,
    // handleBlur,
    // handleSubmit,
    isSubmitting
  } = props;
  return (
    // <form onSubmit={handleSubmit}>
    <Form>
      {/* <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      /> */}
      <Field name="date" component={CustomInputDateComponent} />
      <Field name="venue" component={CustomInputTextComponent} />

      <FieldArray
        name="artists"
        render={arrayHelpers => (
          <div className="clearfix">
            {values.artists
              ? values.artists.map((artist, index) => (
                  <div key={index}>
                    <label>Artist Name {index + 1}</label>
                    <div className="form-inline">
                      <Field
                        name={`artists.${index}.name`}
                        className="form-group mb-2 form-control"
                      />
                      {/* <Field
                        name={`artists.${index}.stageTime`}
                        className="form-group mx-sm-3 mb-2 form-control"
                      /> */}
                      {/* // both these conventions do the same */}
                      {/* <input className="form-control" {...field} {...props} /> */}

                      {/* <Field
                      name={`artist[${index}]name`}
                      component={CustomInputTextComponent}
                    />
                    <Field
                      name={`artist[${index}]stageTime`}
                      component={CustomInputTextComponent}
                    /> */}

                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm mb-2"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))
              : null}

            <button
              className="btn btn-outline-dark btn-sm float-left"
              type="button"
              onClick={() => arrayHelpers.push({ name: "", stageTime: "" })}
            >
              Add Artist
            </button>
          </div>
        )}
      />

      <hr />

      <div className="clearfix">
        <div className="form-group float-right">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>

      <hr />

      <Field name="notes" component={CustomInputTextComponent} />
      {/* {errors.name && touched.name && <div id="feedback">{errors.name}</div>} */}

      <Field
        name="isSoldOut"
        component={CustomInputCheckboxComponent}
        labeltext="Sold Out"
      />
      <Field
        name="isCancelled"
        component={CustomInputCheckboxComponent}
        labeltext="Cancelled"
      />

      {/* <Field name="notes" component={CustomInputTextComponent} /> */}
      <hr />

      <div className="clearfix">
        <div className="form-group float-right">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>

      <hr />
    </Form>
    // </form>
  );
};

export const ShowForm = withFormik<ShowPartial, Show>({
  mapPropsToValues: props => ({
    date: props.date || new Date(),
    venue: props.venue || "",
    artists: props.artists || [],
    isSoldOut: props.isSoldOut || false,
    isCancelled: props.isCancelled || false,
    notes: props.notes || ""
  }),

  // Custom sync validation
  validate: values => {
    const errors: any = {};

    if (!values.date) {
      errors.date = "Please choose a date";
    }

    if (!values.venue) {
      errors.venue = "Please choose a venue";
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      const valuesClone = JSON.parse(JSON.stringify(values));
      valuesClone.notes =
        valuesClone.notes === "" ? undefined : valuesClone.notes;

      // alert(JSON.stringify(values, null, 2));
      alert(JSON.stringify(valuesClone, null, 2));

      setSubmitting(false);
    }, 1000);
  },

  // Useful for React Developer Tools
  displayName: "ShowForm"
})(ShowFormCore);
