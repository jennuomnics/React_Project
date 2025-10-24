import { RecentUploads } from '@/pages/public-profile/profiles/default';
import {
  BasicSettings,
  CalendarAccounts,
  CommunityBadges,
  Connections,
  PersonalInfo,
  StartNow,
  Work,
} from './components';
import { ChangeEmail } from './components/ChangeEmail';
import { ChangePassword } from './components/ChangePassword';
import { TwoFactorCard } from './components/TwoFactorCard';

export function AccountUserProfileContent() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <PersonalInfo />
          {/* <BasicSettings title="Basic Settings" /> */}
          {/* <Work /> */}
          {/* <CommunityBadges /> */}
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <ChangeEmail />
          <ChangePassword />
          <TwoFactorCard />
          {/* <StartNow /> */}
          {/* <CalendarAccounts /> */}
          {/* <Connections url="#" /> */}
          {/* <RecentUploads title="My Files" /> */}
        </div>
      </div>
    </div>
  );
}
