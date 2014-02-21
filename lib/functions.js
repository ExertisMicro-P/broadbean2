function functionName() 
{
   var myName = arguments.callee.toString();
   myName = myName.substr('function '.length);
   myName = myName.substr(0, myName.indexOf('('));

   return myName;
}