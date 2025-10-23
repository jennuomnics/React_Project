;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


;











const validationSchema = (usingAuthApp: boolean) =>
  Yup.object().shape({
    ...(usingAuthApp
      ? {
          authCode: Yup.array()
            .of(Yup.string().matches(/^\d$/, 'Must be a digit'))
            .test(
              'len',
              'Please Enter All 6 Digits',
              (val) =>
                Array.isArray(val) &&
                val.join('').length === 6 &&
                val.every((v) => /^\d$/.test(v ?? '')),
            )
        }
      : {
          recoveryCode: Yup.string().required('Recovery code is required'),
        }),
  });

const TwoFactorAuth = () => {
  const [usingAuthApp, setUsingAuthApp] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate()

  const initialValues = {
    authCode: Array(6).fill(''),
    recoveryCode: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    if (usingAuthApp) {
      const fullCode = values.authCode.join('');
      console.log('Submitting Authenticator Code:', fullCode);
      navigate('/')
     
    } else {
      console.log('Submitting Recovery Code:', values.recoveryCode);
      navigate('/')
    }
  };

  return (
    <div className="flex flex-col gap-5 p-2">
      <img
        src={toAbsoluteUrl('/media/illustrations/34.svg')}
        className="dark:hidden h-20 mb-2"
        alt=""
      />
      <img
        src={toAbsoluteUrl('/media/illustrations/34-dark.svg')}
        className="light:hidden h-20 mb-2"
        alt=""
      />

      <div className="text-center mb-2">
        <h3 className="text-lg font-medium text-mono mb-5">
          Verify your phone
        </h3>
        <div className="flex flex-col">
          <span className="text-sm text-secondary-foreground mb-1.5">
            Enter the {usingAuthApp ? 'Authenticator' : 'Recovery'} code
          </span>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(usingAuthApp)}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange={false} 
        validateOnBlur={false} 
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-center gap-1.5">
              {usingAuthApp &&
                values.authCode.map((value, index) => (
                  <Field name={`authCode[${index}]`} key={index}>
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        autoComplete="one-time-code"
                        maxLength={1}
                        className="size-10 shrink-0 px-0 text-center"
                        value={value}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d$/.test(val)) {
                            const newCode = [...values.authCode];
                            newCode[index] = val;
                            setFieldValue('authCode', newCode);
                            if (index < inputRefs.current.length - 1) {
                              inputRefs.current[index + 1]?.focus();
                            }
                          } else if (val === '') {
                            const newCode = [...values.authCode];
                            newCode[index] = '';
                            setFieldValue('authCode', newCode);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Backspace' &&
                            values.authCode[index] === ''
                          ) {
                            if (index > 0) {
                              inputRefs.current[index - 1]?.focus();
                            }
                          }
                        }}
                      />
                    )}
                  </Field>
                ))}

              {!usingAuthApp && (
                <div className="w-full">
                  <Field name="recoveryCode">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your recovery code"
                        className="w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="recoveryCode"
                    component="div"
                    className="text-sm text-red-500 mt-1 text-center"
                  />
                </div>
                
              )}
            </div>

            {usingAuthApp && (
              <ErrorMessage
                name="authCode"
                component="div"
                className="text-sm text-red-500 mt-1 text-center"
              />
            )}

            <div className="flex items-center justify-center mb-2 w-87">
              <span className="text-sm text-secondary-foreground me-1.5">
                Don't have{' '}
                {usingAuthApp ? 'Authenticator App' : 'Recovery Code'}?
              </span>
              <p
                onClick={() => setUsingAuthApp(!usingAuthApp)}
                className="font-semibold text-foreground hover:text-primary cursor-pointer"
              >
                Use {usingAuthApp ? 'Recovery' : 'Authenticator'} Code
              </p>
            </div>

            <Button type="submit" className="grow">
              Continue
            </Button>

            <Link
              to="/auth/signin"
              className="gap-2.5 flex items-center justify-center text-sm font-semibold text-foreground hover:text-primary"
            >
              <MoveLeft className="size-3.5 opacity-70" />
              Back to Login
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { TwoFactorAuth };