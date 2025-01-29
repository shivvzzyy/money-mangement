import Admin from "../../Layout/Admin";

const Component = () => {
  return (
    <div className="relative flex flex-col p-4 md:p-8">
      <h1>Reports</h1>
    </div>
  );
};

const Settings = () => {
  return (
    <Admin>
      <Component />
    </Admin>
  );
};

export default Settings;
