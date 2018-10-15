import * as React from "react";
import {
  Formik,
  /* FormikProps, */
  Form,
  Field,
  /* FieldProps, */
  FieldArray
} from "formik";

interface FriendsModel {
  friends: Friend[];
}

interface Friend {
  name: string;
  age: number;
}

export const FriendList = () => {
  const initialValue: FriendsModel = {
    friends: [
      { name: "jared", age: 26 },
      { name: "ian", age: 33 },
      { name: "brent", age: 42 }
    ]
  };

  const handleSubmit = (value: FriendsModel) => {
    setTimeout(() => {
      alert(JSON.stringify(value, null, 2));
    }, 500);
  };

  return (
    <div>
      <h1>Manage List</h1>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        render={({ values }) => (
          <Form>
            <FieldArray
              name="friends"
              render={arrayHelpers => (
                <div className="clearfix">
                  {values.friends.map((friend, index) => (
                    <div key={index} className="form-inline">
                      <Field
                        name={`friends[${index}]name`}
                        className="form-group mb-2 form-control"
                      />
                      <Field
                        name={`friends.${index}.age`}
                        className="form-group mx-sm-3 mb-2 form-control"
                      />
                      {/* // both these conventions do the same */}
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm mb-2"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}

                  <button
                    className="btn btn-outline-dark btn-sm float-left"
                    type="button"
                    onClick={() => arrayHelpers.push({ name: "", age: 0 })}
                  >
                    Add Item
                  </button>
                </div>
              )}
            />

            <div>
              <hr />
            </div>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        )}
      />
    </div>
  );
};
