#!/bin/bash

DIR="build"

# Check the file is exists or not
if [ -d $DIR ]; then
   # Remove  the file with permission
   rm -r "$DIR"
   # Check the file is removed or not
   if [ -d $DIR ]; then
      echo "$DIR is not removed"
   else
      echo "$DIR is removed"
   fi
else
   echo "DIR does not exist"
fi