dependencies=( "react" "react-dom" "react-icons" )

cd node_modules
for dep in ${dependencies[@]}; do
  cd ${dep}
  yarn link
  cd ..
done
cd ..