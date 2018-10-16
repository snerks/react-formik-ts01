import * as React from "react";
import {
  InjectedFormikProps,
  withFormik,
  Field,
  FieldProps,
  Form /*, FormikState */
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
        (field.value as Date)
          ? (field.value as Date).toISOString().substring(0, 10)
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
    <input className="form-check-input" type="checkbox" {...field} {...props} />
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

interface ShowContainer {
  show: Show;
}

type ShowContainerPartial = Partial<ShowContainer>;

interface Show {
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

interface Artist {
  name: string;
  stageTime?: string;

  videoUrl?: string;
}

// type ShowPartial = Partial<Show>;

// Show & {handleSubmit: Function}

const ShowObjectFormCore: React.SFC<
  InjectedFormikProps<ShowContainerPartial, ShowContainer>
> = props => {
  const {
    // values,
    // touched,
    // errors,
    // handleChange,
    // handleBlur,
    // handleSubmit,
    isSubmitting,
    show
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
      <Field
        name="date"
        component={CustomInputDateComponent}
        value={show && show.date ? show.date : new Date()}
      />
      <Field
        name="venue"
        component={CustomInputTextComponent}
        value={show && show.venue}
      />
      {/* {errors.name && touched.name && <div id="feedback">{errors.name}</div>} */}

      <Field
        name="isSoldOut"
        component={CustomInputCheckboxComponent}
        labeltext="Sold Out"
        value={show && show.isSoldOut}
      />
      <Field
        name="isCancelled"
        component={CustomInputCheckboxComponent}
        labeltext="Cancelled"
        value={show && show.isCancelled}
      />

      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </Form>
    // </form>
  );
};

export const ShowObjectForm = withFormik<ShowContainerPartial, ShowContainer>({
  mapPropsToValues: props => ({
    show: props.show || {
      date: new Date(),
      venue: "",
      isSoldOut: false,
      isCancelled: false,
      artists: []
    }
  }),

  // Custom sync validation
  validate: values => {
    const errors: any = {};

    if (!values.show.date) {
      errors.date = "Please choose a date";
    }

    if (!values.show.venue) {
      errors.venue = "Please choose a venue";
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values.show, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  // Useful for React Developer Tools
  displayName: "ShowObjectForm"
})(ShowObjectFormCore);
