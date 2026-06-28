
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EditProfile = ({user,handleChange,handleSave,message,formData} ) => {
  

  return (
    <div className="max-w-xl mx-auto p-6 bg-card rounded-3xl border shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <div className="space-y-4">
        <Input 
          name="firstName" 
          placeholder="First Name" 
          value={formData.firstName} 
          onChange={handleChange} 
        />
        <Input 
          name="lastName" 
          placeholder="Last Name" 
          value={formData.lastName} 
          onChange={handleChange} 
        />
        <Input 
          name="avatar" 
          placeholder="Avatar URL" 
          value={formData.avatar} 
          onChange={handleChange} 
        />
        <Textarea 
          name="about" 
          placeholder="About Me" 
          value={formData.about} 
          onChange={handleChange} 
        />
        <Input 
          name="skills" 
          placeholder="Skills (comma separated)" 
          value={formData.skills} 
          onChange={handleChange} 
        />
        
        <Button 
          className="w-full" 
          onClick={handleSave}
        >
          Save Changes
        </Button>
        {message && <p className="text-center text-sm mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default EditProfile;