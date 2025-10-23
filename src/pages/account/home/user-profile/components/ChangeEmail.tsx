import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { SquarePen } from 'lucide-react';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const ChangeEmail = () => {
  const [email, setEmail] = useState('jennusuryateja@gmail.com');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const emailValidationSchema = Yup.object().shape({
    newEmail: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const handleEmailSubmit = (values: { newEmail: string }) => {
    setEmail(values.newEmail);
    setIsEditing(false);
  };

  return (
    <Card className="min-w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Change Email</CardTitle>
        <Button variant="ghost" mode="icon" onClick={handleEdit}>
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>

      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
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

            {isEditing && (
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  New Email
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <Formik
                    initialValues={{ newEmail: '' }}
                    validationSchema={emailValidationSchema}
                    onSubmit={handleEmailSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                  >
                    {({ isSubmitting }) => (
                      <Form className="flex flex-col gap-2">
                        <div>
                          <Field name="newEmail">
                            {({ field }: any) => (
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter new email"
                                className="w-full"
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="newEmail"
                            component="div"
                            className="text-sm text-red-500 mt-1 text-left"
                          />
                        </div>

                        <div className="flex gap-2 mt-2">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="grow"
                          >
                            Change Email
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            className="grow"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { ChangeEmail };
