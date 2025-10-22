import { Link, Outlet } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';


export function BrandedLayout() {
  return (
    <>
      <style>
        {`
          .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/1.png')}');
          }
          .dark .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/1-dark.png')}');
          }
        `}
      </style>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
        <div className="flex flex-col justify-center items-center p-8 lg:p-10 order-2 lg:order-1 bg-white dark:bg-gray-900">
          <img src="/media/logo.png" style={{height:'160px',width:'60%'}}/>
          <Card className="w-full max-w-[400px] shadow-lg">
            <CardContent className="p-6">
              <Outlet />
            </CardContent>
          </Card>
        </div>


        <div className="hidden lg:block relative order-1 lg:order-2 bg-blue-500">
          <img
            src="https://cdn.dribbble.com/userupload/14898990/file/original-ba68e98ea10e1867e831884c3b153387.png?resize=1504x1128&vertical=center"
            alt="Cloud Computing Illustration"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* <div className="grid  grow">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
          <Card className="w-full max-w-[400px]">
            <CardContent className="p-6">
              <Outlet />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className=''>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/879/539/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
          alt="Cloud Computing Illustration"
          className="h-full w-[80%] object-cover"
        />
      </div> */}
      {/* <div className="lg:rounded-xl lg:border lg:border-border lg:m-5 order-1 lg:order-2 bg-top xxl:bg-center xl:bg-cover bg-no-repeat branded-bg">
        <div className="flex flex-col p-8 lg:p-16 gap-4"> */}
      {/* <Link to="/">
              <img
                src={toAbsoluteUrl('/media/app/mini-logo.svg')}
                className="h-[28px] max-w-none"
                alt=""
              />
            </Link> */}

      {/* <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-mono">
                Secure Dashboard Access
              </h3>
              <div className="text-base font-medium text-secondary-foreground">
                A robust authentication gateway ensuring
                <br /> secure&nbsp;
                <span className="text-mono font-semibold">
                  efficient user access
                </span>
                &nbsp;to the Metronic
                <br /> Dashboard interface.
              </div>
            </div> */}
      {/* </div>
      </div> */}
      {/* </div> */}
    </>
  );
}