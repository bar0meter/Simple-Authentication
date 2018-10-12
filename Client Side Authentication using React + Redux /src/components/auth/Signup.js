import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";

class Signup extends Component {
  onSubmitForm = formProps => {
    console.log(formProps);
    this.props.signup(formProps, () => {
      this.props.history.push("/feature");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmitForm)}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            component="input"
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="off"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign Up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(Signup);
