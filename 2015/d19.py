from random import shuffle

text = ''

with open('./2015/input.txt') as f:
    text = f.read()

lines = text.splitlines()
idx = lines.index('')
reps = [(line.split(' => ')) for line in lines[0:idx]]
reps = [(rep[0], rep[1]) for rep in reps]
mol = lines[idx + 1]

# reps = [('Al', 'ThF), ...]
# mol = "CRnCaCa..."

target = mol
part2 = 0

while target != 'e':
    tmp = target
    for a, b in reps:
        if b not in target:
            continue

        target = target.replace(b, a, 1)
        part2 += 1

    if tmp == target:
        target = mol
        part2 = 0
        shuffle(reps)

print (part2)