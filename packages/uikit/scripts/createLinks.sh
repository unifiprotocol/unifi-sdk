dependencies=( "react" "react-dom" )

cd node_modules
for dep in ${dependencies[@]}; do
  cd ${dep}
  yarn link
  cd ..
done
cd ..