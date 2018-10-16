import * as React from "react";
import { withFormik, Field, FieldProps } from "formik";

const CustomInputTextComponent: React.SFC<FieldProps<any>> = ({
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

const CustomInputDateComponent: React.SFC<FieldProps<any>> = ({
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
    <input type="date" className="form-control" {...field} {...props} />

    {touched[field.name] &&
      errors[field.name] && (
        <div className="alert alert-danger">{errors[field.name]}</div>
      )}
  </div>
);

export interface Thing {
  name: string;
}

const ShowFormCore = (props: any) => {
  const {
    // values,
    // touched,
    // errors,
    // handleChange,
    // handleBlur,
    handleSubmit
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      /> */}
      <Field name="date" component={CustomInputDateComponent} />
      <Field name="venue" component={CustomInputTextComponent} />
      {/* {errors.name && touched.name && <div id="feedback">{errors.name}</div>} */}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export const ShowForm = withFormik({
  mapPropsToValues: () => ({ date: "", venue: "" }),

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
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 300);
  },

  displayName: "ShowForm"
})(ShowFormCore);
