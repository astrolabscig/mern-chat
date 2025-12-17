import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'


const Home = () => {

  return (
    // <div className="flex rounded-lg bg relative h-130 overflow-y-scroll">
    //     <Sidebar />
    //     <MessageContainer />
    // </div>
    <div className="flex h-[500px] rounded-lg bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden">
    <Sidebar className="w-64 bg-[#212121] border-r border-white/5" />
    <MessageContainer className="flex-1 bg-[#1a1a1a]" />
    </div>
  )
}

export default Home