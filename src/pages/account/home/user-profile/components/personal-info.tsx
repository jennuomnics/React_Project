import { useState } from 'react';
import { AvatarInput } from '@/partials/common/avatar-input';
import { SquarePen } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';


const PersonalInfo = () => {
 
  const [personalInfo, setPersonalInfo] = useState({
    avatar: '',
    firstName: 'Jennu',
    lastName: 'Suryateja',
    email: 'jennusuryateja@gmail.com',
    gender: 'Male',
    password: 'Password last changed 2 months ago',
  });


  const handleEdit = () => {
    console.log('Edit personal info clicked');
   
  };

  return (
    <Card className="min-w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Personal Info</CardTitle>
        <Button variant="ghost" mode="icon" onClick={handleEdit}>
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>

      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
           
            <TableRow>
              <TableCell className="py-2 min-w-28 text-secondary-foreground font-normal">
                Avatar
              </TableCell>
              <TableCell className="py-2 text-gray700 font-normal min-w-32 text-sm">
                150x150px JPEG, PNG Image
              </TableCell>
              <TableCell className="py-2 text-center">
                <div className="flex justify-center items-center">
                  <AvatarInput />
                </div>
              </TableCell>
            </TableRow>

          
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                First Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normal text-sm">
                {personalInfo.firstName}
              </TableCell>
            </TableRow>

           
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Last Name
              </TableCell>
              <TableCell className="py-3 text-foreground font-normal">
                {personalInfo.lastName}
              </TableCell>
            </TableRow>

           
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Email
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {personalInfo.email}
              </TableCell>
            </TableRow>

          
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Gender
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {personalInfo.gender}
              </TableCell>
            </TableRow>

          
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Password
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                <Badge size="md" variant="success" appearance="light">
                  {personalInfo.password}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { PersonalInfo };