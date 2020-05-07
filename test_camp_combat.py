'''
This is a test file for the camp combat algorithm.
It reproduces the rules of battle against a demon camp, showing
the percentage of losses you would take considering your army's strength
and that of the demon camp you're attacking.
'''

def combat(army, demons):
    if army < demons * 1.1:
        return 'defeat'
    combatResult = army - demons
    return (army / combatResult * 5) - 5

fights = (
    (8, 2),
    (8, 5),
    (8, 8),
    (80, 50),
    (800, 100),
    (800, 200),
    (800, 300),
    (800, 400),
    (800, 500),
    (800, 600),
    (800, 700),
    (800, 790),
    (8000, 10),
    (8000, 100),
    (8000, 1000),
    (8000, 2000),
    (8000, 3000),
    (8000, 4000),
    (8000, 5000),
    (8000, 6000),
    (8000, 7000),
    (8000, 7100),
    (8000, 7200),
    (8000, 7250),
    (8000, 7260),
    (8000, 7270),
    (8000, 7272),
    (8000, 7273),
    (8000, 7275),
    (8000, 7300),
    (8000, 7400),
    (8000, 7500),
    (8000, 7900),
)

print('army | camp | outcome')
for f in fights:
    print('{:>4} | {:>4} | {}'.format(
        f[0],
        f[1],
        combat(f[0], f[1])
    ))
