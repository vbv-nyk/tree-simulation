import { Canvas, useThree } from "@react-three/fiber";
import randomColor from "randomcolor";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import DispensedNumbers from "./generators/dispensedNumbers";
import StrongDispenser from "./generators/dispensers/strongDispenser";
import WeakDispenser from "./generators/dispensers/weakDispenser";
import StrongGenerator from "./generators/generators/strongGenerator";
import WeakGenerator from "./generators/generators/weakGenerator";
import Tree from "./generators/tree";
export default function App() {
  const created = ({ gl }) => {
    const color = randomColor({
      luminosity: "bright",
      format: "rgb", // e.g. 'rgb(225,200,20)'
    });

    console.log(gl);
    gl.setClearColor(color, 1);
  };

  function CameraControler() {
    const { camera } = useThree();
    camera.position.z = -12;
    return null;
  }

  const [dispensedNumbers, setDispensedNumbers] = useState([]);
  const [trees, setTrees] = useState([]);

  const generations = [
    "0 will increase the height and width of tree",
    "1 will reduce the height and width of tree",
    "2 will increase the number of leaves on the tree",
    "3 will reduce the number of leaves on the tree",
    "4 will increase the height, width and the leaves",
  ];

  function message(tree) {
    if (tree == 0) {
      return "Increasing Height And Width";
    } else if (tree == 1) {
      return "Reducing Height And Width";
    } else if (tree == 2) {
      return "Increasing Leaves";
    } else if (tree == 3) {
      return "Reducing Leaves";
    } else if (tree == 4) {
      return "Increasing Height, Width And Leaves";
    }
  }

  function updateTrees() {
    const length = dispensedNumbers.length / 5;
    let properties = [];
    setTrees((trees) => {
      trees = [];
      console.log(length);
      for (let i = 0; i < length; i++) {
        properties = [...dispensedNumbers.slice(i * 5, i * 5 + 5)];
        trees = [...trees, properties];
      }
      console.log(trees);
      return trees;
    });
  }

  useEffect(() => {
    updateTrees();
  }, [dispensedNumbers]);
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl font-extrabold text-start md:text-center">
        Internal Implementation Of A Pseudo Random Number Generator (PRNGS)
      </h1>
      <div className="flex flex-col gap-6 ">
        <h1 className="text-2xl font-bold">Dispensers</h1>
        <p>
          Before we take a look into an actual random number generator, it's
          good to know how each number is generated. To generate a random
          number, we use a hardcoded formula containing seed, and the value of
          this seed is changed based on the result that is produced. To obtain a
          random number, we use the module symbol "%" followed by the range.
          Which is popularly known as the modular divison.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <WeakDispenser
            dispensedNumbers={dispensedNumbers}
            setDispensedNumbers={setDispensedNumbers}
          />
          <StrongDispenser
            dispensedNumbers={dispensedNumbers}
            setDispensedNumbers={setDispensedNumbers}
          />
        </div>
        <DispensedNumbers type={"Strong"} dispensedNumbers={dispensedNumbers} />
      </div>
      <div className="flex flex-col gap-6 ">
        <h1 className="text-2xl font-bold ">Generators</h1>
        <p>
          In the real world, a random number generator is embedded into a system
          keeps generating random numbers. Let's assume that we have 2 random
          number generators which uses the formulas we have above for a weak and
          a strong generator respectively. Let's also assume that catch is what
          is called when you call the random() function in any given programming
          language. And the random number returned at that instant is the
          (instantaneous seed)%(range).
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <WeakGenerator
            dispensedNumbers={dispensedNumbers}
            setDispensedNumbers={setDispensedNumbers}
            title={"A Weak Random Number Generator"}
            description={
              "Following is how random numbers are generated using a weak random number generator."
            }
            delay={100}
          />
          <StrongGenerator
            title={"A Strong Random Number Generator"}
            dispensedNumbers={dispensedNumbers}
            setDispensedNumbers={setDispensedNumbers}
            description={
              "Following is how random numbers are generated using a strong random number generator."
            }
            delay={100}
          />
        </div>
        <DispensedNumbers type={"Strong"} dispensedNumbers={dispensedNumbers} />
      </div>
      <div className="flex flex-col gap-6 ">
        <h1 className="text-2xl font-bold ">
          Tree Simluation With A Weak Generator
        </h1>
        <p>
          Using the values generated by the weak pseudo random number generator,
          we'll be simulating a tree. We can see how every tree looks the same,
          this is a metaphor to bad encryption.
        </p>
        <div>
          <p>
            Following were the rules followed when simulating the tree. Every 5
            consecutive values will be considered when generating the tree
          </p>
          <ul>
            {generations.map((generation, i) => (
              <li>{generation}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <WeakGenerator
              dispensedNumbers={dispensedNumbers}
              setDispensedNumbers={setDispensedNumbers}
              title={"Growing Trees With The Generated Random Numbers (Weak)"}
              description={
                "Now, we're going to generate trees while following the above rules and make some observations."
              }
              delay={1000}
            />
          </div>
          <div>
            <StrongGenerator
              title={"Growing Trees With The Generated Random Numbers (Strong)"}
              dispensedNumbers={dispensedNumbers}
              setDispensedNumbers={setDispensedNumbers}
              description={
                "Now, we're going to generate trees while following the above rules and make some observations."
              }
              delay={1000}
            />
          </div>
        </div>
        <DispensedNumbers type={"Strong"} dispensedNumbers={dispensedNumbers} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2">
          {trees.map((tree, i) => (
            <div className="flex flex-col " key={i}>
              <div className="flex gap-2 px-4 py-2 font-bold text-white bg-black w-fit">
                <div>{tree}</div>
                <div>{message(tree.at(-1))}</div>
              </div>

              <div className="h-[400px]">
                <Canvas onCreated={created}>
                  <CameraControler />
                  <Tree
                    height={1}
                    width={1}
                    leaves={1}
                    dispensedNumbers={dispensedNumbers}
                    treeNumber={i}
                    properties={tree}
                  />
                </Canvas>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
