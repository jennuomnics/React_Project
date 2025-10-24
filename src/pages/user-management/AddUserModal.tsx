import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const personalInfoValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').max(50),
  lastName: Yup.string().required('Last name is required').max(50),
  email: Yup.string().email('Invalid email').required('Email is required'),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other'])
    .required('Gender is required'),
  password: Yup.string().required('Password is required').min(8),
});

interface AddUserModalProps {
  open: boolean;
  onOpenChange: () => void;
  initialValues?: {
    avatar?: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
  };
  onSubmit?: (values: any) => void;
}

export function AddUserModal({
  open,
  onOpenChange,
  initialValues = {
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
  },
  onSubmit,
}: AddUserModalProps) {
  const handleFormSubmit = (values: any) => {
    if (onSubmit) onSubmit(values);
    onOpenChange();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 space-y-0 max-w-[500px]">
        <DialogHeader className="p-4 pb-1">
          <DialogTitle className="text-lg">Add User</DialogTitle>
        </DialogHeader>
        <div className="border-b border-b-border"></div>

        <div className="px-4 pb-4">
          <Formik
            initialValues={initialValues}
            validationSchema={personalInfoValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="flex flex-col gap-3">
                {/* Avatar */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-secondary-foreground font-medium">
                    Avatar
                  </label>
                  <Input type="file" />
                </div>

                {/* First Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-secondary-foreground font-medium">
                    First Name
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
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-secondary-foreground font-medium">
                    Last Name
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

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-secondary-foreground font-medium">
                    Email
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
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-secondary-foreground font-medium">
                    Password
                  </label>
                  <Field name="password">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                        className={`w-full ${
                          errors.password && touched.password
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-input focus:border-primary focus:ring-primary'
                        }`}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                {/* Footer Buttons */}
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
