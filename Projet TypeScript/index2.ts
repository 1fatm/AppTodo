function somme (a: number, b: number)

{
    return a + b;
}

function soustraction (a: number, b:number )
{
    if (a < 0 ||a<b) 
    {
            return 'Vous avez mis un nombre négatif ou null ';
    }
    else if (a > b)
     {
            return a - b;
    }


}

function division ( a: number, b: number )
{
    if(b==0) 
    {
         return  'La valeur du diviseur est négatif ';
    }

    else 
    {
        return a / b;
    }
}






function multiplication (a: number, b: number)

{
    return a * b;
}

console.log(multiplication(7, 2));

console.log(division(1, 1));

console.log(soustraction(78, 1));

console.log(somme(1,2));
