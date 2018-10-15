import * as React from "react";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";

interface MyFormValues {
  firstName: string;
}

export const BasicSfc: React.SFC<{}> = () => {
  return (
    <div>
      <h1>Basic Sfc TSX</h1>

      <Formik
        initialValues={{ firstName: "" }}
        onSubmit={(values: MyFormValues) => alert(JSON.stringify(values))}
        render={(formikBag: FormikProps<MyFormValues>) => (
          <Form>
            <Field
              name="firstName"
              render={({ field, form }: FieldProps<MyFormValues>) => (
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input className="form-control" type="text" {...field} />
                  {form.touched.firstName &&
                    form.errors.firstName && (
                      <div className="alert alert-danger">
                        {form.errors.firstName}
                      </div>
                    )}
                </div>
              )}
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        )}
      />
    </div>
  );
};
