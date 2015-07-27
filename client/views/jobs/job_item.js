Template.jobItem.helpers({
  expiresAt: function() {
    expiresAt = new Date(this.createdAt);
    expiresAt.setDate(expiresAt.getDate() + this.days_to_advertise); 
    return expiresAt;
  },
  
  expired: function() {
    now = new Date();
    expiresAt = new Date(this.createdAt);
    expiresAt.setDate(expiresAt.getDate() + this.days_to_advertise); 
    return  (now > expiresAt) ? 'expired' : false;
  }
});