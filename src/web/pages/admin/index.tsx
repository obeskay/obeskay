import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getSession, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { BentoGridAdmin } from "@/components/BentoGridAdmin";

const AdminLayout = dynamic(() => import("../../components/layouts/admin"), {
  ssr: false,
});

const Index = (props) => {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <div className="pt-24 container space-y-16">
        <h1>¡Hola, {session?.user?.email}!</h1>
        <BentoGridAdmin />
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps = async (context) => {
  // const data = await getVentas();

  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Index;
