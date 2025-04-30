type data = {
  id:number;
  name:string;
  image:string;
  balance:number;
};

export type friendProps = {
  data: data;
  onSetActive: (id:number) => void;
  active: number;
};

export function Friend({ data, onSetActive, active }: friendProps) {
  return <li>
    <img src={data.image} />
    <h3>{data.name}</h3>
    <p className={data.balance === 0 ? "" : data.balance > 0 ? "green" : "red"}>{data.balance === 0 ? `You and ${data.name} are even` : data.balance > 0 ? `${data.name} owes you ${data.balance}€` : `You owe ${data.name} ${data.balance * -1}€`}</p>
    {active === data.id ? <button className="button" onClick={()=>onSetActive(0)}>Close</button>:
    <button className="button" onClick={()=>onSetActive(data.id)}>Select</button>
    }
  </li>;
}
