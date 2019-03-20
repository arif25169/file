#!/usr/bin/env bash
function program_doesnt_exist {
  local return_=1
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return $return_ instead of printing
  return $return_
}

emails=('test@abc.com' 'test@xyz.org')
passwords=('admin123' 'passwd1!')
for (( i = 0; i < ${#emails[@]}; ++i )); do
    echo "Email: ${emails[i]}"
    echo "Password: ${passwords[i]}"
done

# install nodejs
if program_doesnt_exist node; then
echo ""
  curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
  sudo apt install -y nodejs
fi
