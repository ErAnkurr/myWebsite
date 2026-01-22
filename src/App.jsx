import { useState } from "react";

const initialForm = {
  email: "",
  password: "",
  remember: true,
};

export default function App() {
  const [form, setForm] = useState(initialForm);

  const updateField = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Demo-only: show the captured data.
    alert(`Welcome back, ${form.email || "friend"}!`);
  };

  return (
    <div className="page">
      <div className="background-blur" />
      <main className="card">
        <header className="card__header">
          <span className="pill">Secure Space</span>
          <h1>Sign in to Echo</h1>
          <p>Use your email and password to unlock your dashboard.</p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email address</span>
            <input
              name="email"
              type="email"
              placeholder="you@studio.com"
              value={form.email}
              onChange={updateField}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={updateField}
              required
            />
          </label>

          <div className="row">
            <label className="checkbox">
              <input
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={updateField}
              />
              Remember me
            </label>
            <button className="link" type="button">
              Forgot password?
            </button>
          </div>

          <button className="primary" type="submit">
            Sign in
          </button>
        </form>

        <footer className="card__footer">
          <span>New here?</span>
          <button className="link" type="button">
            Create an account
          </button>
        </footer>
      </main>

      <section className="hero">
        <h2>Focus on work that matters.</h2>
        <p>
          Manage projects, align teams, and keep your momentum with a workspace
          built for modern studios.
        </p>
        <div className="hero__stats">
          <div>
            <strong>42%</strong>
            <span>faster approvals</span>
          </div>
          <div>
            <strong>3.1x</strong>
            <span>fewer status meetings</span>
          </div>
          <div>
            <strong>99.9%</strong>
            <span>uptime guarantee</span>
          </div>
        </div>
      </section>
    </div>
  );
}
