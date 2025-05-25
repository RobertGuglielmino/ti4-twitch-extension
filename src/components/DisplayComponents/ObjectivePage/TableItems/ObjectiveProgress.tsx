const ObjectiveProgress = (input: string) => {

    const formattadString = input.split("/");

    return (<div className="text-grey-400">
        {formattadString}
    </div>);
}

export default ObjectiveProgress;