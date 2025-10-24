import React, { useState, useEffect } from "react";
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
import { catchErrors } from "../utils/utils";
import { useRouter } from "next/router";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      await axios.post(`${baseUrl}/api/forgot-password/validate-token`, { token });
      setTokenValid(true);
    } catch (error) {
      setError("Invalid or expired reset token");
    }
    setCheckingToken(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${baseUrl}/api/forgot-password/reset`, {
        token,
        newPassword: password,
      });
      setSuccess(true);
    } catch (error) {
      setError(catchErrors(error));
    }

    setLoading(false);
  };

  if (checkingToken) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Headtags />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Validating token...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Headtags />
        <div className="max-w-md w-full space-y-8">
          <Error text="Invalid or expired reset token" />
          <div className="text-center">
            <Link href="/forgot-password">
              <a className="text-blue-600 dark:text-blue-400 hover:underline">
                Request a new reset link
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Headtags />
        <div className="max-w-md w-full space-y-8">
          <InfoBox
            text="Password reset successful! You can now log in with your new password."
            type="success"
          />
          <div className="text-center">
            <Link href="/login">
              <a className="text-blue-600 dark:text-blue-400 hover:underline">
                Go to Login
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
          <FormHeading>Reset Password</FormHeading>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Enter your new password below.
          </p>
          
          {error && <Error text={error} />}
          
          <form onSubmit={handleSubmit}>
            <Password>
              <PasswordInput
                placeholder="Enter new password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </Password>

            <Password>
              <PasswordInput
                placeholder="Confirm new password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                required
              />
            </Password>

            <SmallButton loading={loading} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </SmallButton>
          </form>
        </FormWrapper>
      </FormContainer>
    </div>
  );
}

export default ResetPassword;
