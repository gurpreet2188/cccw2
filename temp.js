<ul className='flex flex-col space-y-4 w-[100%]'>
          <li className='flex flex-row items-center bg-slate-100 p-2 h-[4rem] w-[100%]'>
            <div className='basis-[30%]'>Name</div>
            <div className='basis-[35%] text-right'>Value</div>
            <div className='basis-[35%] text-right'>Change</div>
          </li>
          <div>

            <div className='flex flex-col space-y-2'>
              {data ? data?.items.map((v, i) => {
                return (
                  <li key={i} className='flex flex-row items-center space-y-4 h-[4rem] bg-slate-50 p-4'>
                    {/* <div> */}
                    <p className='basis-[30%]'>{v?.info?.title}</p>
                    <p className='basis-[35%] text-right'>{v?.price?.last?.value}</p>
                    <p className='basis-[35%] text-right'>{v?.price?.last?.today_change}</p>
                    {/* </div> */}
                  </li>
                )
              }) : 'Loading...'}
            </div>
          </div>
        </ul>
