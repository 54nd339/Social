import React, { useState } from "react";
import Link from "next/link";
import Headtags from "../components/Headtags";
import { Password, PasswordInput } from "../components/HelperComponents/Inputs";
import { SmallButton } from "../components/HelperComponents/Buttons";
import { FormContainer, FormWrapper } from "../components/HelperComponents/Containers";
import { FormHeading } from "../components/HelperComponents/Headings";
import { Error } from "../components/HelperComponents/Error";
import { InfoBox } from "../components/HelperComponents/InfoBox";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${baseUrl}/api/forgot-password`, { email });
      setSuccess(true);
    } catch (error) {
      setError(catchErrors(error));
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Headtags />
        <div className="max-w-md w-full space-y-8">
          <InfoBox
            text="Password reset email sent! Check your inbox and follow the instructions to reset your password."
            type="success"
          />
          <div className="text-center">
            <Link href="/login">
              <a className="text-blue-600 dark:text-blue-400 hover:underline">
                Back to Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <Headtags />
      <FormContainer>
        <FormWrapper>
          <FormHeading>Forgot Password</FormHeading>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
          
          {error && <Error text={error} />}
          
          <form onSubmit={handleSubmit}>
            <Password>
              <PasswordInput
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </Password>

            <SmallButton loading={loading} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </SmallButton>
          </form>

          <div className="text-center mt-4">
            <Link href="/login">
              <a className="text-blue-600 dark:text-blue-400 hover:underline">
                Back to Login
              </a>
            </Link>
          </div>
        </FormWrapper>
      </FormContainer>
    </div>
  );
}

export default ForgotPassword;
