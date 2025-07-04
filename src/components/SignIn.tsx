//import React from 'react'

const SignIn = () => {
  return (
    <form className="card" data-bs-theme="dark">
      <div className="form-group">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="unameInput"
            placeholder="SuperCoolGuy99"
          />
          <label htmlFor="unameInput">Username</label>
        </div>
        <div className="invalid-feedback">Please input a valid username.</div>
      </div>
      <div className="form-group">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="pwdInput"
            placeholder="Password"
          />
          <label htmlFor="pwdInput">Password</label>
        </div>
        <div className="invalid-feedback">Please input a valid password.</div>
      </div>
      <fieldset className="form-group row">
        <legend className="col-form-label col-sm-2">Role</legend>
        <div className="col-md-5 form-check">
          <input
            className="form-check-input"
            type="radio"
            name="roleRadio"
            id="pcRadio"
            value="pc"
            checked
          />
          <label className="form-check-label" htmlFor="pcRadio">
            Player
          </label>
        </div>
        <div className="col-md-5 form-check">
          <input
            className="form-check-input"
            type="radio"
            name="roleRadio"
            id="gmRadio"
            value="gm"
            checked
          />
          <label className="form-check-label" htmlFor="gmRadio">
            Game Master
          </label>
        </div>
      </fieldset>
      <div className="form-group">
        <a href="#" className="form-text col-sm-4">
          forgot?
        </a>
        <button type="submit" className="btn btn-primary col-sm-4">
          Sign In
        </button>
        <a href="#" className="form-text col-sm-4">
          request?
        </a>
      </div>
    </form>
  );
};

export default SignIn;
