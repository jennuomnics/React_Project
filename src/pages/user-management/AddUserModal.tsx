import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import Select from 'react-select';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const roleOptions = [
  { value: 'User', label: 'User' },
  { value: 'Admin', label: 'Admin' },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').max(50),
  lastName: Yup.string().required('Last name is required').max(50),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(8),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  role: Yup.object().required('Role is required').nullable(),
});

interface AddUserModalProps {
  open: boolean;
  onOpenChange: () => void;
  onSubmit?: (values: any) => void;
}

export function AddUserModal({
  open,
  onOpenChange,
  onSubmit,
}: AddUserModalProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      background: 'var(--background)',
      border: state.isFocused
        ? '1px solid var(--ring)'
        : state.selectProps['aria-invalid']
          ? '1px solid var(--destructive/60)'
          : '1px solid var(--input)',
      boxShadow: state.isFocused ? '0 0 0 3px var(--ring/30)' : 'none',
      borderRadius: '0.375rem',
      color: 'var(--foreground)',
      minHeight: '2.5rem',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--ring)' : 'var(--input)',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'var(--muted-foreground/80)',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'var(--foreground)',
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleFormSubmit = (values: any) => {
    if (onSubmit)
      onSubmit({
        ...values,
        role: values.role?.value,
      });
    onOpenChange();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[500px]">
        <DialogHeader className="p-4 pb-1">
          <DialogTitle className="text-lg">Add User</DialogTitle>
        </DialogHeader>

        <div className="border-b border-b-border"></div>

        <div className="px-4 pb-4">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
              role: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form className="flex flex-col gap-3">
                {/* First Name & Last Name Side by Side */}
                <div className="flex gap-3">
                  {/* First Name */}
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Field name="firstName">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter first name"
                          className={`w-full ${
                            errors.firstName && touched.firstName
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-input focus:border-primary focus:ring-primary'
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-xs text-red-500"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Field name="lastName">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter last name"
                          className={`w-full ${
                            errors.lastName && touched.lastName
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-input focus:border-primary focus:ring-primary'
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-xs text-red-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email"
                        className={`w-full ${
                          errors.email && touched.email
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-input focus:border-primary focus:ring-primary'
                        }`}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1 relative">
                  <label className="text-sm font-medium">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter password"
                    className={`w-full pr-10 border transition-colors ${
                      errors.password && touched.password
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-input focus:border-primary focus:ring-primary'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1 relative">
                  <label className="text-sm font-medium">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="confirmPassword"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm password"
                    className={`w-full pr-10 border transition-colors ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-input focus:border-primary focus:ring-primary'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    {confirmPasswordVisible ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <Select
                    name="role"
                    options={roleOptions}
                    value={values.role}
                    onChange={(selected) => setFieldValue('role', selected)}
                    placeholder="Select Role"
                    styles={customSelectStyles}
                    classNamePrefix="react-select"
                    aria-invalid={!!(errors.role && touched.role)}
                  />
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="grow"
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="grow"
                    onClick={onOpenChange}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
