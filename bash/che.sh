#!/usr/bin/env bash
function program_doesnt_exist {
  local return_=1
  type $1 >/dev/null 2>&1 || { local return_=0; }
  
  # return $return_ instead of printing
if [ "$return_" -eq "1" ]; then
   echo "but it is already installed";
fi
 return $return_

}

# emails=('testabc.com' 'testxyz.org')
# passwords=('admin123' 'passwd1!')
# for (( i = 0; i < ${#emails[@]}; ++i )); do
#     echo "Email: ${emails[i]}"
#     echo "Password: ${passwords[i]}"
# done
# if grep -q "dicounter_${string1}_from_${string2}" MasterFile.txt; then 
#    echo "dicounter_${string1}_from_${string2} already exists in the MasterFile. Would you like to proceed?"
#    read string3
#    if [[ "${string3^}" == 'Y' ]]; then
#       screen -S trans -L /dev/ttyACM0
#       screen -S trans -X stuff 's'$(echo -ne '\015')
#       sleep 8s
#       screen -S trans -X quit
#    else
#        exit 0
#    fi
# else
#     #opening screen & begin analysis
#     screen -S trans -L /dev/ttyACM0
#     screen -S trans -X stuff 's'$(echo -ne '\015')
#     sleep 8s
#     screen -S trans -X quit
# fi
Str=$(ldconfig -p | grep libghfh)
echo ${#Str}
if [[ ${#Str} == '0' ]]; then
#sudo apt install 4pane
  wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb
  sudo dpkg -i /tmp/libpng12.deb
  rm /tmp/libpng12.deb
else
  exit 0
fi

apps=('node' 'node')
echo "Installing: ${apps[0]}"
if program_doesnt_exist ${apps[0]}; then
  sudo apt install -y ${apps[0]}
fi
echo "Installing: ${apps[1]}"
if program_doesnt_exist ${apps[1]}; then
  sudo apt install -y ${apps[1]}
fi
