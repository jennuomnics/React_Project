import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { SquarePen } from 'lucide-react';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const emailValidationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ChangeEmail = () => {
  const [email, setEmail] = useState('jennusuryateja@gmail.com');
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(email); 

  return (
    <Card className="min-w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Change Email</CardTitle>

        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setNewEmail(email); 
              }}
            >
              Cancel
            </Button>
            <Button form="changeEmailForm" type="submit">
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
            id="changeEmailForm"
            initialValues={{ newEmail }}
            validationSchema={emailValidationSchema}
            onSubmit={(values) => {
              setEmail(values.newEmail);
              setIsEditing(false);
              setNewEmail(values.newEmail); 
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form id="changeEmailForm">
                <Table className="align-middle text-sm text-muted-foreground">
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-3 text-secondary-foreground font-normal">
                        Current Email
                      </TableCell>
                      <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                        {email}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="py-3 text-secondary-foreground font-normal">
                        New Email
                      </TableCell>
                      <TableCell className="py-3 px-3 text-secondary-foreground text-sm font-normal">
                        <Field name="newEmail">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter new email"
                              value={newEmail}
                              onChange={(e) => {
                                handleChange(e);
                                setNewEmail(e.target.value);
                              }}
                              onBlur={handleBlur}
                              className={`w-full border transition-colors ${
                                errors.newEmail && touched.newEmail
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-input focus:border-primary focus:ring-primary'
                              }`}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="newEmail"
                          component="div"
                          className="text-sm text-red-500 mt-1 text-left"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Form>
            )}
          </Formik>
        ) : (
          <Table className="align-middle text-sm text-muted-foreground">
            <TableBody>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Current Email
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  {email}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export { ChangeEmail };
