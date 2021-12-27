
import React from 'react'

const DemoOutput = (props) => {
    console.log('DEMO OUTPUT: rendered')

    return <p>{props.show ? 'Demo output paragraph!' : ''}</p>
}

// REACT.memo TELLS REACT NOT TO RE-RENDER A COMPONENT
// IF IT DOES NOT HAVE ANY UPDATES - THIS IS THE FUNCTIONAL
// COMPONENT SOLUTION - CLASS BASED SOLUTION IS TBD.

// REACT.memo IS BASICALLY MEMOIZATION BUT FOR COMPONENTS
// AND COMES WITH A PERFORMANCE COST SINCE IT TELLS REACT
// TO DO TWO THINGS AT ONCE: CACHING VALUES & COMPARING THEM
// THEREFORE THIS SOLUTION IS BEST FOR A LARGE COMPONENT TREE
// WHERE MULTIPLE CHILD COMPONENTS SHOULD NOT BE RE-RENDERED.
export default React.memo(DemoOutput)