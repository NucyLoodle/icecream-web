import { signOut } from '@/auth';


export default function Dashboard() {
    console.log("logged in")
    return(
        <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button>
          Sign Out
        </button>
      </form>
    )   
}
