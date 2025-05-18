const NUMBER_OF_PLAYERS = 6;

const ScoringRowHeader = ({children}: any) => {
    return (<tr>
        <td colSpan={NUMBER_OF_PLAYERS + 1} className="text-xs font-avalors text-gray-300 p-1 bg-gray-800">
            {children}
        </td>
    </tr>);
}

export default ScoringRowHeader;