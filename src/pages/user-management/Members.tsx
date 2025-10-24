'use client';

import { useMemo, useState } from 'react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, Row, RowSelectionState, SortingState, useReactTable } from '@tanstack/react-table';
import { EllipsisVertical, Filter, Search, Settings2, X } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardHeading, CardTable, CardToolbar } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable, DataGridTableRowSelect, DataGridTableRowSelectAll } from '@/components/ui/data-grid-table';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { AddUserModal } from './AddUserModal';


interface MemberData {
  avatar: string;
  name: string;
}

interface IData {
  id: string;
  member: MemberData;
  email: string;
  status: 'Active' | 'InActive';
  twoFA: 'Enable' | 'Not Enable';
  role: string;
  joined: string;
}

const data: IData[] = [
  {
    id: '1',
    member: { avatar: '300-3.png', name: 'Tyler Hero' },
    email: 'tyler.hero@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '2',
    member: { avatar: '300-4.png', name: 'Esther Howard' },
    email: 'esther.howard@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '3',
    member: { avatar: '300-5.png', name: 'Jacob Jones' },
    email: 'jacob.jones@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '4',
    member: { avatar: '300-6.png', name: 'Cody Fisher' },
    email: 'cody.fisher@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '5',
    member: { avatar: '300-7.png', name: 'Leslie Alexander' },
    email: 'leslie.alexander@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '6',
    member: { avatar: '300-8.png', name: 'Brooklyn Simmons' },
    email: 'brooklyn.simmons@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '7',
    member: { avatar: '300-9.png', name: 'Darlene Robertson' },
    email: 'darlene.robertson@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '8',
    member: { avatar: '300-10.png', name: 'Jerome Bell' },
    email: 'jerome.bell@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '9',
    member: { avatar: '300-11.png', name: 'Devon Lane' },
    email: 'devon.lane@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '10',
    member: { avatar: '300-12.png', name: 'Jane Cooper' },
    email: 'jane.cooper@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '11',
    member: { avatar: '300-13.png', name: 'Ronald Richards' },
    email: 'ronald.richards@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '12',
    member: { avatar: '300-14.png', name: 'Kathryn Murphy' },
    email: 'kathryn.murphy@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '13',
    member: { avatar: '300-15.png', name: 'Jacob Smith' },
    email: 'jacob.smith@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '14',
    member: { avatar: '300-16.png', name: 'Kristin Watson' },
    email: 'kristin.watson@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '15',
    member: { avatar: '300-17.png', name: 'Cameron Williamson' },
    email: 'cameron.williamson@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '16',
    member: { avatar: '300-18.png', name: 'Courtney Henry' },
    email: 'courtney.henry@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '17',
    member: { avatar: '300-19.png', name: 'Ralph Edwards' },
    email: 'ralph.edwards@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '18',
    member: { avatar: '300-20.png', name: 'Arlene McCoy' },
    email: 'arlene.mccoy@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '19',
    member: { avatar: '300-21.png', name: 'Theresa Webb' },
    email: 'theresa.webb@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '20',
    member: { avatar: '300-22.png', name: 'Guy Hawkins' },
    email: 'guy.hawkins@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '21',
    member: { avatar: '300-23.png', name: 'Floyd Miles' },
    email: 'floyd.miles@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '22',
    member: { avatar: '300-24.png', name: 'Ronald Richards' },
    email: 'ronald.richards@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '23',
    member: { avatar: '300-25.png', name: 'Kathryn Murphy' },
    email: 'kathryn.murphy@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '24',
    member: { avatar: '300-26.png', name: 'Jacob Smith' },
    email: 'jacob.smith@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '25',
    member: { avatar: '300-27.png', name: 'Kristin Watson' },
    email: 'kristin.watson@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '26',
    member: { avatar: '300-28.png', name: 'Cameron Williamson' },
    email: 'cameron.williamson@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '27',
    member: { avatar: '300-29.png', name: 'Courtney Henry' },
    email: 'courtney.henry@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '28',
    member: { avatar: '300-30.png', name: 'Ralph Edwards' },
    email: 'ralph.edwards@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '29',
    member: { avatar: '300-31.png', name: 'Arlene McCoy' },
    email: 'arlene.mccoy@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '30',
    member: { avatar: '300-32.png', name: 'Theresa Webb' },
    email: 'theresa.webb@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '31',
    member: { avatar: '300-33.png', name: 'Guy Hawkins' },
    email: 'guy.hawkins@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '32',
    member: { avatar: '300-3.png', name: 'Tyler Hero' },
    email: 'tyler.hero@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '33',
    member: { avatar: '300-4.png', name: 'Esther Howard' },
    email: 'esther.howard@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '34',
    member: { avatar: '300-5.png', name: 'Jacob Jones' },
    email: 'jacob.jones@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '35',
    member: { avatar: '300-6.png', name: 'Cody Fisher' },
    email: 'cody.fisher@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '36',
    member: { avatar: '300-7.png', name: 'Leslie Alexander' },
    email: 'leslie.alexander@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '37',
    member: { avatar: '300-8.png', name: 'Brooklyn Simmons' },
    email: 'brooklyn.simmons@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '38',
    member: { avatar: '300-9.png', name: 'Darlene Robertson' },
    email: 'darlene.robertson@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '39',
    member: { avatar: '300-10.png', name: 'Jerome Bell' },
    email: 'jerome.bell@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '40',
    member: { avatar: '300-11.png', name: 'Devon Lane' },
    email: 'devon.lane@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '41',
    member: { avatar: '300-12.png', name: 'Jane Cooper' },
    email: 'jane.cooper@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '42',
    member: { avatar: '300-13.png', name: 'Ronald Richards' },
    email: 'ronald.richards@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '43',
    member: { avatar: '300-14.png', name: 'Kathryn Murphy' },
    email: 'kathryn.murphy@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '44',
    member: { avatar: '300-15.png', name: 'Jacob Smith' },
    email: 'jacob.smith@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '45',
    member: { avatar: '300-16.png', name: 'Kristin Watson' },
    email: 'kristin.watson@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '46',
    member: { avatar: '300-17.png', name: 'Cameron Williamson' },
    email: 'cameron.williamson@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '47',
    member: { avatar: '300-18.png', name: 'Courtney Henry' },
    email: 'courtney.henry@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '48',
    member: { avatar: '300-19.png', name: 'Ralph Edwards' },
    email: 'ralph.edwards@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '49',
    member: { avatar: '300-20.png', name: 'Arlene McCoy' },
    email: 'arlene.mccoy@example.com',
    status: 'Active',
    twoFA: 'Enable',
    role: 'User',
    joined: '2 days ago',
  },
  {
    id: '50',
    member: { avatar: '300-21.png', name: 'Theresa Webb' },
    email: 'theresa.webb@example.com',
    status: 'InActive',
    twoFA: 'Not Enable',
    role: 'User',
    joined: '2 days ago',
  },
];

// const data: IData[] = [
//   {
//     id: '1',
//     member: {
//       avatar: '300-3.png',
//       name: 'Tyler Hero',
//       tasks: '26',
//     },
//     location: {
//       name: 'Estonia',
//       flag: 'estonia.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Current session',
//   },
//   {
//     id: '2',
//     member: {
//       avatar: '300-2.png',
//       name: 'Esther Howard',
//       tasks: '639',
//     },
//     location: {
//       name: 'Malaysia',
//       flag: 'malaysia.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '3',
//     member: {
//       avatar: '300-11.png',
//       name: 'Jacob Jones',
//       tasks: '125',
//     },
//     location: {
//       name: 'Ukraine',
//       flag: 'ukraine.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Today, 9:53 am',
//   },
//   {
//     id: '4',
//     member: {
//       avatar: '300-2.png',
//       name: 'Cody Fisher',
//       tasks: '81',
//     },
//     location: {
//       name: 'Canada',
//       flag: 'canada.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Current session',
//   },
//   {
//     id: '5',
//     member: {
//       avatar: '300-5.png',
//       name: 'Leslie Alexander',
//       tasks: '203',
//     },
//     location: {
//       name: 'India',
//       flag: 'india.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Month ago',
//   },
//   {
//     id: '6',
//     member: {
//       avatar: '300-6.png',
//       name: 'Brooklyn Simmons',
//       tasks: '45',
//     },
//     location: {
//       name: 'Spain',
//       flag: 'spain.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 3:45 pm',
//   },
//   {
//     id: '7',
//     member: {
//       avatar: '300-7.png',
//       name: 'Darlene Robertson',
//       tasks: '108',
//     },
//     location: {
//       name: 'Germany',
//       flag: 'germany.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: '2 days ago',
//   },
//   {
//     id: '8',
//     member: {
//       avatar: '300-8.png',
//       name: 'Jerome Bell',
//       tasks: '91',
//     },
//     location: {
//       name: 'France',
//       flag: 'france.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '9',
//     member: {
//       avatar: '300-9.png',
//       name: 'Devon Lane',
//       tasks: '56',
//     },
//     location: {
//       name: 'Japan',
//       flag: 'japan.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 11:00 am',
//   },
//   {
//     id: '10',
//     member: {
//       avatar: '300-10.png',
//       name: 'Jane Cooper',
//       tasks: '47',
//     },
//     location: {
//       name: 'South Korea',
//       flag: 'south-korea.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: '3 days ago',
//   },
//   {
//     id: '11',
//     member: {
//       avatar: '300-12.png',
//       name: 'Ronald Richards',
//       tasks: '64',
//     },
//     location: {
//       name: 'Brazil',
//       flag: 'brazil.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Month ago',
//   },
//   {
//     id: '12',
//     member: {
//       avatar: '300-13.png',
//       name: 'Kathryn Murphy',
//       tasks: '78',
//     },
//     location: {
//       name: 'United Kingdom',
//       flag: 'united-kingdom.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 10:30 am',
//   },
//   {
//     id: '13',
//     member: {
//       avatar: '300-14.png',
//       name: 'Jacob Smith',
//       tasks: '92',
//     },
//     location: {
//       name: 'Australia',
//       flag: 'australia.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '14',
//     member: {
//       avatar: '300-15.png',
//       name: 'Kristin Watson',
//       tasks: '102',
//     },
//     location: {
//       name: 'Italy',
//       flag: 'italy.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Today, 8:00 am',
//   },
//   {
//     id: '15',
//     member: {
//       avatar: '300-16.png',
//       name: 'Cameron Williamson',
//       tasks: '58',
//     },
//     location: {
//       name: 'Russia',
//       flag: 'russia.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: '2 days ago',
//   },
//   {
//     id: '16',
//     member: {
//       avatar: '300-17.png',
//       name: 'Courtney Henry',
//       tasks: '75',
//     },
//     location: {
//       name: 'India',
//       flag: 'india.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Month ago',
//   },
//   {
//     id: '17',
//     member: {
//       avatar: '300-18.png',
//       name: 'Ralph Edwards',
//       tasks: '109',
//     },
//     location: {
//       name: 'Spain',
//       flag: 'spain.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '18',
//     member: {
//       avatar: '300-19.png',
//       name: 'Arlene McCoy',
//       tasks: '84',
//     },
//     location: {
//       name: 'Canada',
//       flag: 'canada.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 1:00 pm',
//   },
//   {
//     id: '19',
//     member: {
//       avatar: '300-20.png',
//       name: 'Theresa Webb',
//       tasks: '56',
//     },
//     location: {
//       name: 'Malaysia',
//       flag: 'malaysia.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '20',
//     member: {
//       avatar: '300-21.png',
//       name: 'Guy Hawkins',
//       tasks: '68',
//     },
//     location: {
//       name: 'Estonia',
//       flag: 'estonia.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Today, 3:00 pm',
//   },
//   {
//     id: '21',
//     member: {
//       avatar: '300-22.png',
//       name: 'Floyd Miles',
//       tasks: '43',
//     },
//     location: {
//       name: 'Ukraine',
//       flag: 'ukraine.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 11:45 am',
//   },
//   {
//     id: '22',
//     member: {
//       avatar: '300-23.png',
//       name: 'Devon Lane',
//       tasks: '91',
//     },
//     location: {
//       name: 'India',
//       flag: 'india.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Month ago',
//   },
//   {
//     id: '23',
//     member: {
//       avatar: '300-24.png',
//       name: 'Ronald Richards',
//       tasks: '78',
//     },
//     location: {
//       name: 'France',
//       flag: 'france.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '24',
//     member: {
//       avatar: '300-25.png',
//       name: 'Kathryn Murphy',
//       tasks: '85',
//     },
//     location: {
//       name: 'Japan',
//       flag: 'japan.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 4:00 pm',
//   },
//   {
//     id: '25',
//     member: {
//       avatar: '300-26.png',
//       name: 'Jacob Smith',
//       tasks: '92',
//     },
//     location: {
//       name: 'South Korea',
//       flag: 'south-korea.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '26',
//     member: {
//       avatar: '300-27.png',
//       name: 'Kristin Watson',
//       tasks: '102',
//     },
//     location: {
//       name: 'Italy',
//       flag: 'italy.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Today, 8:00 am',
//   },
//   {
//     id: '27',
//     member: {
//       avatar: '300-28.png',
//       name: 'Cameron Williamson',
//       tasks: '58',
//     },
//     location: {
//       name: 'Russia',
//       flag: 'russia.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: '2 days ago',
//   },
//   {
//     id: '28',
//     member: {
//       avatar: '300-29.png',
//       name: 'Courtney Henry',
//       tasks: '75',
//     },
//     location: {
//       name: 'Spain',
//       flag: 'spain.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Month ago',
//   },
//   {
//     id: '29',
//     member: {
//       avatar: '300-30.png',
//       name: 'Ralph Edwards',
//       tasks: '109',
//     },
//     location: {
//       name: 'Canada',
//       flag: 'canada.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '30',
//     member: {
//       avatar: '300-31.png',
//       name: 'Arlene McCoy',
//       tasks: '84',
//     },
//     location: {
//       name: 'Malaysia',
//       flag: 'malaysia.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 1:00 pm',
//   },
//   {
//     id: '31',
//     member: {
//       avatar: '300-32.png',
//       name: 'Theresa Webb',
//       tasks: '56',
//     },
//     location: {
//       name: 'Estonia',
//       flag: 'estonia.svg',
//     },
//     status: {
//       label: 'On Leave',
//       variant: 'destructive',
//     },
//     recentlyActivity: 'Week ago',
//   },
//   {
//     id: '32',
//     member: {
//       avatar: '300-33.png',
//       name: 'Guy Hawkins',
//       tasks: '68',
//     },
//     location: {
//       name: 'Ukraine',
//       flag: 'ukraine.svg',
//     },
//     status: {
//       label: 'Remote',
//       variant: 'primary',
//     },
//     recentlyActivity: 'Today, 3:00 pm',
//   },
//   {
//     id: '33',
//     member: {
//       avatar: '300-34.png',
//       name: 'Floyd Miles',
//       tasks: '43',
//     },
//     location: {
//       name: 'India',
//       flag: 'india.svg',
//     },
//     status: {
//       label: 'In Office',
//       variant: 'success',
//     },
//     recentlyActivity: 'Today, 11:45 am',
//   },
// ];

function ActionsCell({ row }: { row: Row<IData> }) {
  const { copyToClipboard } = useCopyToClipboard();
  const handleCopyId = () => {
    copyToClipboard(String(row.original.id));
    const message = `Member ID successfully copied: ${row.original.id}`;
    toast.custom(
      (t) => (
        <Alert
          variant="mono"
          icon="success"
          close={false}
          onClose={() => toast.dismiss(t)}
        >
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      ),
      {
        position: 'top-center',
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" mode="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        {/* <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => {}}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Members = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'joined', desc: true }, // changed from recentlyActivity
  ]);
  const [selected2FA, setSelected2FA] = useState<string[]>([]);


  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const twoFACounts = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        acc[item.twoFA] = (acc[item.twoFA] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [data]);


  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesStatus =
        !selectedStatuses?.length || selectedStatuses.includes(item.status);
      const matches2FA =
        !selected2FA?.length || selected2FA.includes(item.twoFA);

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.member.name.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.role.toLowerCase().includes(searchLower);

      return matchesStatus && matches2FA && matchesSearch;
    });
  }, [searchQuery, selectedStatuses, selected2FA]);


  const statusCounts = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1; // updated for new status field
        return acc;
      },
      {} as Record<string, number>,
    );
  }, []);

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses((prev = []) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };

  const handle2FAChange = (checked: boolean, value: string) => {
    setSelected2FA((prev = []) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };


  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'id',
        accessorFn: (row) => row.id,
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 51,
        meta: { cellClassName: '' },
      },

      {
        id: 'member',
        accessorFn: (row) => row.member,
        header: ({ column }) => (
          <DataGridColumnHeader title="Member" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="shrink-0">
              <img
                src={toAbsoluteUrl(
                  `/media/avatars/${row.original.member.avatar}`,
                )}
                className="h-9 w-9 rounded-full"
                alt={row.original.member.name}
              />
            </div>
            <div className="flex flex-col">
              <Link
                to="#"
                className="font-medium text-sm text-mono hover:text-primary leading-none"
              >
                {row.original.member.name}
              </Link>
            </div>
          </div>
        ),
        enableSorting: true,
        size: 220,
        meta: { cellClassName: '' },
      },

      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: ({ column }) => (
          <DataGridColumnHeader title="Email" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal text-sm">
            {row.original.email}
          </span>
        ),
        enableSorting: true,
        size: 200,
        meta: { cellClassName: '' },
      },

      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            size="lg"
            variant={
              row.original.status === 'Active' ? 'success' : 'destructive'
            }
            appearance="light"
            shape="circle"
          >
            <BadgeDot />
            {row.original.status}
          </Badge>
        ),
        enableSorting: true,
        size: 120,
        meta: { cellClassName: '' },
      },

      {
        id: 'twoFA',
        accessorFn: (row) => row.twoFA,
        header: ({ column }) => (
          <DataGridColumnHeader title="2FA" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            size="lg"
            variant={
              row.original.twoFA === 'Enable' ? 'success' : 'warning'
            }
            appearance="light"
           
          >
         
            {row.original.twoFA}
          </Badge>
        ),
        enableSorting: true,
        size: 110,
        meta: { cellClassName: '' },
      },

      {
        id: 'role',
        accessorFn: (row) => row.role,
        header: ({ column }) => (
          <DataGridColumnHeader title="Role" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-foreground font-normal">
            {row.original.role}
          </span>
        ),
        enableSorting: true,
        size: 120,
        meta: { cellClassName: '' },
      },

      {
        id: 'joined',
        accessorFn: (row) => row.joined,
        header: ({ column }) => (
          <DataGridColumnHeader title="Joined" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-secondary-foreground font-normal text-sm">
            {row.original.joined}
          </span>
        ),
        enableSorting: true,
        size: 130,
        meta: { cellClassName: '' },
      },

      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <ActionsCell row={row} />,
        enableSorting: false,
        size: 60,
        meta: { headerClassName: '' },
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => String(row.id),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const Toolbar = () => {
    const { table } = useDataGrid();
    const [isAddUserModalOpen,setIsAddUserModal] = useState(false)
    const handleCloseAddUserModal = () => {
      setIsAddUserModal(false)
    }

    return (
      <>
       {
        isAddUserModalOpen && <AddUserModal open={isAddUserModalOpen} onOpenChange={handleCloseAddUserModal}/>
       }
        <CardToolbar>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button onClick={() => setIsAddUserModal(true)}>Add User</Button>
          </div>
          <DataGridColumnVisibility
            table={table}
            trigger={
              <Button variant="outline">
                <Settings2 />
                Columns
              </Button>
            }
          />
        </CardToolbar>
      </>
    );
  };

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader>
          <CardHeading>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search Members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9 w-40"
                />
                {searchQuery.length > 0 && (
                  <Button
                    mode="icon"
                    variant="ghost"
                    className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchQuery('')}
                  >
                    <X />
                  </Button>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter />
                    Filters
                    {(selectedStatuses.length > 0 ||
                      selected2FA.length > 0) && (
                      <Badge size="sm" variant="outline">
                        {selectedStatuses.length + selected2FA.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground">
                      Filters
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground">
                        Status
                      </div>
                      {Object.keys(statusCounts).map((status) => (
                        <div key={status} className="flex items-center gap-2.5">
                          <Checkbox
                            id={status}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={(checked) =>
                              handleStatusChange(checked === true, status)
                            }
                          />
                          <Label
                            htmlFor={status}
                            className="grow flex items-center justify-between font-normal gap-1.5"
                          >
                            {status}
                            <span className="text-muted-foreground">
                              {statusCounts[status]}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>

                    {/* 2FA Filter */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground">
                        2FA
                      </div>
                      {Object.keys(twoFACounts).map((value) => (
                        <div key={value} className="flex items-center gap-2.5">
                          <Checkbox
                            id={value}
                            checked={selected2FA.includes(value)}
                            onCheckedChange={(checked) =>
                              handle2FAChange(checked === true, value)
                            }
                          />
                          <Label
                            htmlFor={value}
                            className="grow flex items-center justify-between font-normal gap-1.5"
                          >
                            {value}
                            <span className="text-muted-foreground">
                              {twoFACounts[value]}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeading>
          <Toolbar />
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
};

export { Members };