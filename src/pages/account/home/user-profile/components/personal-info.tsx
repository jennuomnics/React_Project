import { useState } from 'react';
import { AvatarInput } from '@/partials/common/avatar-input';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { SquarePen } from 'lucide-react';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bio: Yup.string().required('Bio is required'),
  phoneNumber: Yup.string()
    .matches(/^\+\d{1,4}\s?\d{6,14}$/, 'Invalid phone number')
    .required('Phone Number is required'),
});

type PersonalInfoType = {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phoneNumber: string;
};

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    avatar: '',
    firstName: 'Jennu',
    lastName: 'Suryateja',
    email: 'jennusuryateja@gmail.com',
    bio: 'Male',
    phoneNumber: '+91 9441801502',
  });

  const fields: (keyof PersonalInfoType)[] = [
    'firstName',
    'lastName',
    'email',
    'bio',
    'phoneNumber',
  ];

  return (
    <Card className="min-w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Personal Info</CardTitle>

        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button form="personalInfoForm" type="submit">
              Submit
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            mode="icon"
            onClick={() => setIsEditing(true)}
          >
            <SquarePen size={16} className="text-blue-500" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        {isEditing ? (
          <Formik
            id="personalInfoForm"
            initialValues={personalInfo}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setPersonalInfo(values);
              setIsEditing(false);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form id="personalInfoForm">
                <Table className="align-middle text-sm text-muted-foreground">
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-3 min-w-28 text-secondary-foreground font-normal">
                        Avatar
                      </TableCell>
                      <TableCell className="py-3 text-gray700 font-normal min-w-32 text-sm">
                        150x150px JPEG, PNG Image
                      </TableCell>
                      <TableCell className="py-3 text-center">
                        <AvatarInput />
                      </TableCell>
                    </TableRow>

                    {fields.map((field) => (
                      <TableRow key={field}>
                        <TableCell className="py-3 text-secondary-foreground font-normal capitalize">
                          {field === 'bio'
                            ? 'Bio'
                            : field.replace(/([A-Z])/g, ' $1')}
                        </TableCell>
                        <TableCell className="py-3">
                          <Field name={field}>
                            {({ field: f }: any) => (
                              <Input
                                {...f}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={f.value || ''}
                                className={`w-full border transition-colors ${
                                  errors[field] && touched[field]
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-input focus:border-primary focus:ring-primary'
                                }`}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name={field}
                            component="div"
                            className="text-sm text-red-500 mt-1 text-left"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Form>
            )}
          </Formik>
        ) : (
          <Table className="align-middle text-sm text-muted-foreground">
            <TableBody>
              <TableRow>
                <TableCell className="py-3 min-w-28 text-secondary-foreground font-normal">
                  Avatar
                </TableCell>
                <TableCell className="py-3 text-gray700 font-normal min-w-32 text-sm">
                  150x150px JPEG, PNG Image
                </TableCell>
                <TableCell className="py-3 text-center">
                  <AvatarInput />
                </TableCell>
              </TableRow>

              {fields.map((field) => (
                <TableRow key={field}>
                  <TableCell className="py-3 text-secondary-foreground font-normal capitalize">
                    {field === 'bio' ? 'Bio' : field.replace(/([A-Z])/g, ' $1')}
                  </TableCell>
                  <TableCell className="py-3 text-foreground font-normal text-sm">
                    {personalInfo[field]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export { PersonalInfo };
