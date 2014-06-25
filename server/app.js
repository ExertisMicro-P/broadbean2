
    Meteor.startup(function () {
        // bootstrap the admin user if they exist -- You'll be replacing the id later
        // This user only exists on the Nitrous.io dev area e.g. http://exmp-eat-46040.euw1.nitrousbox.com/
        if (Meteor.users.findOne("wKtWgyDFPvkhMJ6W2"))
            Roles.addUsersToRoles("wKtWgyDFPvkhMJ6W2", ['admin']);
      
      // thsi admin user is on the live broadbean.meteor.com site
       if (Meteor.users.findOne("3dno7ArXRmdmNCJcH"))
            Roles.addUsersToRoles("3dno7ArXRmdmNCJcH", ['admin']);
      
      // This user only exists on the Nitrous.io dev area e.g. http://exmp-eat-46040.euw1.nitrousbox.com/ (broadbean2)
       if (Meteor.users.findOne("xpEPtEbrYETRJ6GGQ"))
            Roles.addUsersToRoles("xpEPtEbrYETRJ6GGQ", ['admin']);
      

      // for admin on broadbean-dev.meteor.com
      if (Meteor.users.findOne("2ArEwrRZmXNFNh4Xd"))
            Roles.addUsersToRoles("2ArEwrRZmXNFNh4Xd", ['admin']);
      

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "secret"}))
            Roles.createRole("secret");

        if(!Meteor.roles.findOne({name: "double-secret"}))
            Roles.createRole("double-secret");
    });
